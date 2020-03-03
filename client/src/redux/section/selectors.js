import { createSelector } from 'reselect';

// Select section of state
const selectSection = state => state.section;

// Select sub-section from primary section
export const selectSubSection = createSelector([selectSection], section => section.subSection);
