declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.json' {
  const value:
    | string
    | import('lottie-react-native').AnimationObject
    | {
        uri: string;
      }
    | undefined;
  export default value;
}

declare module 'react-native-loader';

interface Currency {
  name: string;
  value: number;
  flag: string;
  symbol: string;
}
