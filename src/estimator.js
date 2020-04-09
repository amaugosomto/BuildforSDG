const getInfectionsByRequestedTime = (periodType, timeToElapse) => {
  let noOfDays = 0;

  switch (periodType) {
    case 'days':
      noOfDays = timeToElapse;
      break;

    case 'weeks':
      noOfDays = timeToElapse * 7;
      break;

    case 'months':
      noOfDays = timeToElapse * 30;
      break;

    default:
      break;
  }

  return (noOfDays ** 10);
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact: {
      currentlyInfected: data.reportedCases * 10,
      infectionsByRequestedTime: Math.trunc(
        (data.reportedCases * 10)
        * getInfectionsByRequestedTime(data.periodType, data.timeToElapse)
        )
    },
    severeImpact: {
      currentlyInfected: data.reportedCases * 50,
      infectionsByRequestedTime: Math.trunc(
        (data.reportedCases * 50)
        * getInfectionsByRequestedTime(data.periodType, data.timeToElapse)
        )
    }
  };
};

export default covid19ImpactEstimator;
