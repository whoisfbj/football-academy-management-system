export interface AcademyProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationNumber: string;
}

export interface AcademyBranch {
  id: string;
  name: string;
  address: string;
}

export interface TrainingCentre {
  id: string;
  name: string;
  branchId: string;
  address: string;
}

export interface AcademyProgram {
  id: string;
  name: string;
  description: string;
  active: boolean;
}