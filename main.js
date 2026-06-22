document.getElementById("year").textContent = new Date().getFullYear();

const projectsGrid = document.getElementById("projects-grid");
const projectsStatus = document.getElementById("projects-status");

async function loadProjects() {
  try {
    const res = await fetch("/api/projects");
    if (!res.ok) throw new Error("Request failed");
    const projects = await res.json();

    if (!projects.length) {
      projectsStatus.textContent = "No projects yet. Check back soon.";
      return;
    }

    projectsStatus.style.display = "none";
    projectsGrid.innerHTML = projects.map(renderProjectCard).join("");
  } catch (err) {
    projectsStatus.textContent =
      "Couldn't load projects right now. Make sure the server and database are running.";
  }
}

function renderProjectCard(project) {
  const tags = (project.techStack || [])
    .map((t) => `<span class="tech-tag">${escapeHTML(t)}</span>`)
    .join("");

  const links = [];
  if (project.githubUrl) {
    links.push(`<a href="${project.githubUrl}" target="_blank" rel="noopener">GitHub →</a>`);
  }
  if (project.liveUrl) {
    links.push(`<a href="${project.liveUrl}" target="_blank" rel="noopener">Live Demo →</a>`);
  }

  return `
    <div class="project-card">
      <h3>${escapeHTML(project.title)}</h3>
      <p>${escapeHTML(project.description)}</p>
      <div class="tech-tags">${tags}</div>
      <div class="project-links">${links.join("")}</div>
    </div>
  `;
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Contact form
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formStatus.textContent = "Sending…";
  formStatus.style.color = "var(--text-muted)";

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to send");

    formStatus.textContent = "Message sent. Thanks for reaching out!";
    formStatus.style.color = "#4ade80";
    form.reset();
  } catch (err) {
    formStatus.textContent = err.message;
    formStatus.style.color = "#f87171";
  }
});

loadProjects();
