// Multi-page integration lives outside the original work articles section.
if (projectsContainer && statNum) {
  renderProjects();
  projectsContainer.querySelectorAll('.project').forEach((article, index) => {
    article.style.setProperty('--d', `${index * 0.08}s`);
    const image = article.querySelector('img');
    image.alt = `${projects[index].title} website preview`;
    image.loading = 'lazy';
    image.decoding = 'async';
  });
} else if (statNum) {
  statNum.textContent = projects.length;
}
