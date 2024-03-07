(function () {
  const btnWrapper = document.querySelector(".calc__btnWrappers");
  const display = document.querySelector("input");
  const symbolsRegx = /[+ \- \/ x \.]$/;
  let typedValue = "";
  const btnClickHandler = (e) => {
    e.stopPropagation();
    const displayHandler = (value) => {
      let prevDisplayedValue = display.value;
      prevDisplayedValue = `${prevDisplayedValue}${value}`;
      display.value = typedValue = prevDisplayedValue;
    };

    const backSpaceHandler = () => {
      let prevDisplayedValue = display.value;
      prevDisplayedValue =
        prevDisplayedValue.trim() === "" ||
        prevDisplayedValue.trim().length === 0
          ? ""
          : prevDisplayedValue.slice(0, prevDisplayedValue.length - 1);

      display.value = typedValue = prevDisplayedValue;
    };

    const resetHandler = () => {
      display.value = typedValue = "";
    };

    const submitHandler = () => {
      const lasttypedString = display.value[display.value.length - 1];
      if (symbolsRegx.test(lasttypedString)) {
        alert("Invalid Value");
        return (display.value = typedValue = "");
      }

      let finalString = typedValue.replaceAll("x", "*");
      const answer = eval(finalString);
      return (display.value = typedValue = answer);
    };

    const keyValue = e.target.getAttribute("value");

    if (e.target.classList.contains("calc__btn")) {
      if (
        keyValue !== "del" &&
        keyValue !== "reset" &&
        keyValue !== "submit" &&
        keyValue !== "+" &&
        keyValue !== "-" &&
        keyValue !== "x" &&
        keyValue !== "/" &&
        keyValue !== "."
      ) {
        displayHandler(keyValue);
        return;
      }

      if (
        keyValue !== "del" &&
        keyValue !== "reset" &&
        keyValue !== "submit" &&
        keyValue !== "+" &&
        keyValue !== "-" &&
        keyValue !== "x" &&
        keyValue !== "/"
      ) {
        const lasttypedString = display.value[display.value.length - 1];
        return symbolsRegx.test(lasttypedString)
          ? display.value
          : displayHandler(keyValue);
      }

      if (keyValue !== "del" && keyValue !== "reset" && keyValue !== "submit") {
        const lasttypedString = display.value[display.value.length - 1];
        return symbolsRegx.test(lasttypedString) || display.value.length === 0
          ? display.value
          : displayHandler(keyValue);
      }

      if (keyValue !== "reset" && keyValue !== "submit") {
        return backSpaceHandler();
      }

      if (keyValue !== "submit") {
        return resetHandler();
      }

      submitHandler();
    }
  };

  btnWrapper.addEventListener("click", btnClickHandler);
})();
