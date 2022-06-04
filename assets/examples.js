class TemplateExample extends HTMLElement {
  connectedCallback() {
    // Store the content of me and hide myself.
    const name = this.getAttribute("element-name");
    const content = this.innerHTML;
    this.style.display = "none";
    // Declare the element.
    const customElement = class extends HTMLElement {
      connectedCallback() {
        // Gather templating info.
        const templateData = {};
        for (let attribute of this.attributes) {
          const name = attribute.name;
          let value = attribute.value;
          try {
            templateData[name] = JSON5.parse(value);
          } catch (e) {
            templateData[name] = value;
          }
        }
        // I mustache you a question.
        const html = Mustache.render(content, templateData);
        this.outerHTML = html;
      }
    };
    customElements.define(name, customElement);
  }
}
customElements.define("template-example", TemplateExample);
