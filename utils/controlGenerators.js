import { folder } from "leva";

const generateControl = (key, config, currentTheme, updateThemeProp) => {
  const { type, label, options, min, max, step, suffix } = config;
  let value = currentTheme.data[key];

  // Sanitize value for numeric inputs
  if (type === 'slider' || type === 'number') {
    value = Number(String(value).replace(/[^0-9.-]+/g, '')) || 0;
  }

  const control = {
    label,
    value,
    onChange: (newValue) => {
      const valueToUpdate = suffix ? `${newValue}${suffix}` : newValue;
      updateThemeProp(key, valueToUpdate);
    },
  };

  if (type === "select") {
    control.options = options;
  }

  if (type === "slider") {
    control.min = min;
    control.max = max;
    control.step = step;
  }

  return control;
};

export const generateControlsFromConfig = (config, currentTheme, updateThemeProp) => {
  const generatedControls = {};

  for (const folderName in config) {
    const folderConfig = config[folderName];
    const folderControls = {};

    for (const key in folderConfig) {
      const controlConfig = folderConfig[key];
      if (controlConfig.isFolder) {
        const nestedFolderControls = {};
        for (const nestedKey in controlConfig) {
          if (nestedKey !== 'isFolder') {
            nestedFolderControls[nestedKey] = generateControl(nestedKey, controlConfig[nestedKey], currentTheme, updateThemeProp);
          }
        }
        folderControls[key] = folder(nestedFolderControls);
      } else {
        folderControls[key] = generateControl(key, controlConfig, currentTheme, updateThemeProp);
      }
    }
    generatedControls[folderName] = folder(folderControls, { collapsed: true });
  }

  return generatedControls;
}; 