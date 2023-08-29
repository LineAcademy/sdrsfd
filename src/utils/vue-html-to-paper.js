function addStyles(win, styles) {
    styles.forEach((style) => {
      let link = win.document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", style);
      win.document.getElementsByTagName("head")[0].appendChild(link);
    });
    let dataTableFooter = win.document.getElementById("dataTableFooter");
    let dataTableActionButtonsHeader = win.document.getElementById("datatable-th-action");
    let dataTableActionButtons = win.document.getElementById("data-table-action-buttons");
    let orderInfoActionButtonSet = win.document.getElementById("orderInfoActionButtonSet");
    let mealPlanActionButton = win.document.getElementById("mealPlanActionButton");
    let customerAddressSection = win.document.getElementById("customerAddressSection");
    let printAddress = win.document.getElementById("printAddress");
    if(dataTableFooter) {
      dataTableFooter.classList.add("hidden");
    }
    if(orderInfoActionButtonSet) {
      orderInfoActionButtonSet.classList.add("hidden");
    }
    if(mealPlanActionButton) {
      mealPlanActionButton.classList.add("hidden");
    }
    if(customerAddressSection) {
      customerAddressSection.classList.add("hidden");
    }
    if(printAddress) {
      printAddress.classList.remove("hidden");
    }
    if(dataTableActionButtonsHeader) {
      dataTableActionButtonsHeader.classList.add("hidden");
    }
    if(dataTableActionButtons) {
      dataTableActionButtons.classList.add("hidden");
    }
  }
  
  const VueHtmlToPaper = {
    install(app, options = {}) {
      app.config.globalProperties.$htmlToPaper = (
        el,
        localOptions,
        cb = () => true
      ) => {
        let defaultName = "_blank",
          defaultSpecs = ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
          defaultReplace = true,
          defaultStyles = [];
        let {
          name = defaultName,
          specs = defaultSpecs,
          replace = defaultReplace,
          styles = defaultStyles
        } = options;
  
        if (!!localOptions) {
          if (localOptions.name) name = localOptions.name;
          if (localOptions.specs) specs = localOptions.specs;
          if (localOptions.replace) replace = localOptions.replace;
          if (localOptions.styles) styles = localOptions.styles;
        }
  
        specs = !!specs.length ? specs.join(",") : "";
  
        const element = window.document.getElementById(el);
  
        if (!element) {
          alert(`Element to print #${el} not found!`);
          return;
        }
  
        const url = "";
        const win = window.open(url, name, specs, replace);
  
        win.document.write(`
          <html>
            <head>
              <title>${window.document.title}</title>
            </head>
            <body>
              ${element.innerHTML}
            </body>
          </html>
        `);
  
        addStyles(win, styles);
  
        setTimeout(() => {
          win.document.close();
          win.focus();
          win.print();
          win.close();
          cb();
        }, 1000);
  
        return true;
      };
    }
  };
  
  export default VueHtmlToPaper;
  