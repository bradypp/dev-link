const effects = {
    easeInCubic: `cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
    easeOutCubic: `cubic-bezier(0.215, 0.61, 0.355, 1)`,
    easeInOutCubic: `cubic-bezier(0.215, 0.61, 0.355, 1)`,
    easeInExpo: `cubic-bezier(0.95, 0.05, 0.795, 0.035)`,
    easeOutExpo: `cubic-bezier(0.19, 1, 0.22, 1)`,
    easeInOutExpo: `cubic-bezier(0.19, 1, 0.22, 1)`,
    easeInBack: `cubic-bezier(0.6, -0.28, 0.735, 0.045)`,
    easeOutBack: `cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
    easeInOutBack: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
};

const animation = {
    transition: (seconds = 0.25) => `all ${seconds}s cubic-bezier(0.3, 0, 0.4, 1);`,
    ...effects,
};

export default animation;
