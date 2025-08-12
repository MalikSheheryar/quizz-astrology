export const calculatePersonalYear = (dateOfBirth: string, year: number): number => {
  const birthDate = new Date(dateOfBirth)
  const birthMonth = birthDate.getMonth() + 1
  const birthDay = birthDate.getDate()

  // Calculate personal year: birth month + birth day + current year, reduced to single digit
  let total = birthMonth + birthDay + year

  while (total > 9 && total !== 11 && total !== 22) {
    total = total
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number.parseInt(digit), 0)
  }

  return total
}

export const calculateLifePath = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth)
  const birthMonth = birthDate.getMonth() + 1
  const birthDay = birthDate.getDate()
  const birthYear = birthDate.getFullYear()

  // Calculate life path: birth month + birth day + birth year, reduced to single digit
  let total = birthMonth + birthDay + birthYear

  while (total > 9 && total !== 11 && total !== 22) {
    total = total
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number.parseInt(digit), 0)
  }

  return total
}
