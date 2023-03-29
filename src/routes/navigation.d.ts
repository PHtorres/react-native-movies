export type AppStackParamList = {
  Main: undefined;
  Settings: undefined;
};

export type AppTabsParamList = {
  Discover: undefined;
  Favorites: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList, AppTabsParamList {}
  }
}
