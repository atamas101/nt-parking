export interface ISchedule {
  alocated: [
    {
      name: string;
      slot: string;
    }
  ];
  others: [
    {
      name: string;
      slot: string;
    }
  ];
}
