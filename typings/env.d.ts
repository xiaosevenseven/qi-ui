declare module 'vue' {
  export interface App {
    [INSTALLED_KEY]?: boolean
  }

  export interface GlobalComponents {
    Component: (props: { is: Component | string }) => void
  }
}

export {}
