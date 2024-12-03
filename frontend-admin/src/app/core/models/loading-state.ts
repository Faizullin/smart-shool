type TLoadingStateKey = 'list' | 'post';

export type LoadingState = Partial<Record<TLoadingStateKey, boolean>>;
