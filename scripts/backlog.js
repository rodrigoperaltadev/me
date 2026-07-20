const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const workspaceRoot = path.join(__dirname, '..');
const backlogDir = path.join(workspaceRoot, '.backlog');
const itemsDir = path.join(backlogDir, 'items');
const configPath = path.join(backlogDir, 'config.yml');

// Helper to parse simple config.yml
function readConfig() {
  const content = fs.readFileSync(configPath, 'utf8');
  const config = {};
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) return;
    const key = trimmed.slice(0, colonIdx).trim();
    let val = trimmed.slice(colonIdx + 1).trim();

    if (val.startsWith('[') && val.endsWith(']')) {
      config[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
    } else if (!isNaN(val) && val !== '') {
      config[key] = parseInt(val, 10);
    } else {
      config[key] = val.replace(/^['"]|['"]$/g, '');
    }
  });
  return config;
}

// Helper to write config.yml
function writeConfig(config) {
  const content = `version: 1
backend: local
flow:
  template: dev
  states: [backlog, todo, in-progress, in-review, done, blocked, dropped]
  terminal: [done, dropped]
id:
  prefix: ${config.prefix || 'BL'}
  next: ${config.next}
`;
  fs.writeFileSync(configPath, content, 'utf8');
}

// Helper to pad IDs, e.g. 13 -> "0013"
function formatId(num) {
  return String(num).padStart(4, '0');
}

// Command: Add new item
function cmdAdd(title, tagsInput) {
  const config = readConfig();
  const nextIdNum = config.next;
  const prefix = config.prefix || 'BL';
  const newId = `${prefix}-${formatId(nextIdNum)}`;
  
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : ['idea'];
  const now = new Date().toISOString();

  const fileContent = matter.stringify('', {
    id: newId,
    title: title,
    state: 'backlog',
    tags: tags,
    created: now,
    updated: now
  });

  const filePath = path.join(itemsDir, `${newId}.md`);
  fs.writeFileSync(filePath, fileContent, 'utf8');

  // Increment config ID
  config.next = nextIdNum + 1;
  writeConfig(config);

  console.log(`[BACKLOG] Creado nuevo item: ${newId} - "${title}" en estado 'backlog'.`);
}

// Command: Update item state (and add reasons if dropping)
function cmdUpdate(id, newState, reason) {
  const filePath = path.join(itemsDir, `${id}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] No se encontró el item con ID: ${id}`);
    process.exit(1);
  }

  const file = matter.read(filePath);
  const oldState = file.data.state;

  file.data.state = newState;
  file.data.updated = new Date().toISOString();

  if (newState === 'dropped' && reason) {
    file.content = (file.content || '').trim() + `\n\n**MOTIVO DE DESCARTE:** ${reason}\n`;
  }

  fs.writeFileSync(filePath, matter.stringify(file.content, file.data), 'utf8');
  console.log(`[BACKLOG] Item ${id} cambiado de '${oldState}' a '${newState}'.`);
}

// Command: List all items grouped by state
function cmdList() {
  const files = fs.readdirSync(itemsDir).filter(f => f.endsWith('.md'));
  const groups = {
    backlog: [],
    'in-review': [],
    todo: [],
    'in-progress': [],
    done: [],
    blocked: [],
    dropped: []
  };

  files.forEach(file => {
    const filePath = path.join(itemsDir, file);
    const parsed = matter.read(filePath);
    const state = parsed.data.state || 'backlog';
    if (groups[state]) {
      groups[state].push(parsed.data);
    } else {
      groups[state] = groups[state] || [];
      groups[state].push(parsed.data);
    }
  });

  console.log('\n=== BACKLOG STATUS ===');
  Object.keys(groups).forEach(state => {
    const list = groups[state];
    if (list.length === 0) return;
    console.log(`\n[${state.toUpperCase()}] (${list.length} ítems):`);
    list.forEach(item => {
      const tagsStr = item.tags ? ` [${item.tags.join(', ')}]` : '';
      console.log(`  - ${item.id}: ${item.title}${tagsStr}`);
    });
  });
  console.log('\n');
}

// Main Router
const [,, command, ...args] = process.argv;

if (!command) {
  console.log(`Uso:
  node scripts/backlog.js list
  node scripts/backlog.js add "Título del item" [tagsSeparadasPorComas]
  node scripts/backlog.js analyze <ID>
  node scripts/backlog.js promote <ID>
  node scripts/backlog.js drop <ID> "Motivo de descarte"
  node scripts/backlog.js done <ID>
  `);
  process.exit(0);
}

switch (command) {
  case 'list':
    cmdList();
    break;
  case 'add':
    if (!args[0]) {
      console.error('[ERROR] Falta el título del item.');
      process.exit(1);
    }
    cmdAdd(args[0], args[1]);
    break;
  case 'analyze':
    if (!args[0]) {
      console.error('[ERROR] Falta el ID del item.');
      process.exit(1);
    }
    cmdUpdate(args[0], 'in-review');
    break;
  case 'promote':
    if (!args[0]) {
      console.error('[ERROR] Falta el ID del item.');
      process.exit(1);
    }
    cmdUpdate(args[0], 'todo');
    break;
  case 'drop':
    if (!args[0]) {
      console.error('[ERROR] Falta el ID del item.');
      process.exit(1);
    }
    cmdUpdate(args[0], 'dropped', args[1] || 'Sin especificar');
    break;
  case 'done':
    if (!args[0]) {
      console.error('[ERROR] Falta el ID del item.');
      process.exit(1);
    }
    cmdUpdate(args[0], 'done');
    break;
  default:
    console.error(`[ERROR] Comando desconocido: ${command}`);
    process.exit(1);
}
