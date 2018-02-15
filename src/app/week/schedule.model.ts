export interface ISchedule {
  date: string;
  alocated: [
    {
      slotType: number;
      user: {
        admin: boolean;
        email: string;
        hireDate: string;
        name: string;
        __v: number;
        _id: string;
      };
    }
  ];
  others: [
    {
      slotType: number;
      user: {
        admin: boolean;
        email: string;
        hireDate: string;
        name: string;
        __v: number;
        _id: string;
      };
    }
  ];
}
