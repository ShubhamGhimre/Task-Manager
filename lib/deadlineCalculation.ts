import { DateTime } from "luxon";

const calculateDueDate = (deadline: string | null) => {
    if (!deadline) return "No deadline set";
    const now = DateTime.now();
    const dueDate = DateTime.fromISO(deadline);
    const daysLeft = Math.ceil(dueDate.diff(now, "days").days);

    if (daysLeft < 0) {
      return "Deadline passed";
    }
    return `${daysLeft} day(s) left`;
  };

  export default calculateDueDate;