enum XLabel {
  Density = "Density",
  Complete = "Complete",
  Bridge = "Bridge",
}

type TimeDatas = {
  n: number[];
  m: number[];
  schmidtCheckTime: number[];
  schmidtFindTime: number[];
  tarjanTime: number[];
  schmidtTime: number[];
  xData: number[];
};

export { XLabel };
export type { TimeDatas };
