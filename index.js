const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let numberOfRequests = 0;

function checkIdProject(req, res, next) {
  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(400).json({ error: 'project not found' });
  }

  return next();
}

server.use((req, res, next) => {
  numberOfRequests++;
  console.log(`Number of request until now is ${numberOfRequests}`);
  return next();
});
server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  projects.push({
    id,
    title,
    tasks: []
  });

  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.send(project);
});

server.delete('/projects/:id', checkIdProject, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(p => p.id === id);

  projects.splice(index, 1);

  return res.send();
});

server.post('/projects/:id/tasks', checkIdProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  res.json(project);
});

server.listen(3000);
