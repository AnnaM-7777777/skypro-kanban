import { COLORS } from "./theme";

export const getCategoryColors = (topic, themeMode) => {

    const categoryColors = COLORS.category;
    
    const colors = {
        "Web Design": { 
            light: { bg: categoryColors.bgOrange, text: categoryColors.textOrange }, 
            dark: { bg: categoryColors.textOrange, text: COLORS.white } 
        },
        Research: { 
            light: { bg: categoryColors.bgGreen, text: categoryColors.textGreen }, 
            dark: { bg: categoryColors.textGreen, text: COLORS.white } 
        },
        Copywriting: { 
            light: { bg: categoryColors.bgPurple, text: categoryColors.textPurple }, 
            dark: { bg: categoryColors.textPurple, text: COLORS.white } 
        },
    };

    const fallback = { bg: COLORS.borderGrey, text: COLORS.white };
    const category = colors[topic] || { light: fallback, dark: fallback };
    
    return themeMode === "dark" ? category.dark : category.light;
};