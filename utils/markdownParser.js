const MarkdownIt = require('markdown-it'),
      md = new MarkdownIt();

function parseMarkdownToHtml(content) {
  try {
    const htmlContent = md.render(content);
    console.log("Markdown content parsed successfully.");
    return htmlContent;
  } catch (error) {
    console.error('Error parsing markdown content:', error.message, error.stack);
    throw error;
  }
}

module.exports = { parseMarkdownToHtml };