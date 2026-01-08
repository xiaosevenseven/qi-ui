import type { SFCWithInstall } from './typescript'

export const withInstall = <T, E extends Record<string, any>>(
  component: T,
  extra?: E
) => {
  ;(component as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [component, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      ;(component as any)[key] = value
    }
  }

  return component as SFCWithInstall<T> & E
}
