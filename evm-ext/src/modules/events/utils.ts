export const log = (message: string) => {
  console.log(
    `%c[Event Module] ${message}`,
    `
      color: white; 
      background: #B11B1B; 
      font-weight: bold;
    `
  )
}
