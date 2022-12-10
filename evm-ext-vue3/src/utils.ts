export const log = (message: string) => {
  console.log(
    `%c[Vue Adapter] ${message}`,
    `
      color: white; 
      background: green; 
      font-weight: bold;
    `
  )
}
