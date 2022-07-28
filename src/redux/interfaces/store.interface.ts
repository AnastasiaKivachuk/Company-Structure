export interface EmployeeInterface {
  id: string,
  height: number,
  width: number,
  data: {
    name: string,
    photoUrl: string,
    position: string,
  },
}

export interface EdgeInterface{
  id: string,
  from: string,
  to: string,
}

export interface StoreDTO {
  employees: {
    employees: EmployeeInterface[],
    edges: EdgeInterface[]
  },
  position: {
    x: number,
    y: number
  }
}
