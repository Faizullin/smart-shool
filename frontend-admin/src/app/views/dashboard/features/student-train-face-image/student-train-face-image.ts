import { TimestampedModel } from "src/app/core/models/timestamped-model";
import { Student } from "../student/student";

export interface StudentTrainFaceImage extends TimestampedModel {
  student: Student;
  file: any;
}
