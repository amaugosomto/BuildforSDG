const getInfectionsByRequestedTime = (periodType, timeToElapse) => {
  let noOfDays = 0;

  switch (periodType) {
    case 'days':
      noOfDays = timeToElapse / 3;
      break;

    case 'weeks':
      noOfDays = (timeToElapse * 7) / 3;
      break;

    case 'months':
      noOfDays = (timeToElapse * 30) / 3;
      break;

    default:
      break;
  }

  return (2 ** Math.trunc(noOfDays));
};

const covid19ImpactEstimator = (data) => {
  const currentlyInfected = data.reportedCases * 10;
  const severeCurrentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * getInfectionsByRequestedTime(
    data.periodType,
    data.timeToElapse
  );
  const severeInfectionsByRequestedTime = severeCurrentlyInfected * getInfectionsByRequestedTime(
    data.periodType,
    data.timeToElapse
  );
  const impactSevereCasesByRequestedTime = Math.trunc(infectionsByRequestedTime * 0.15);
  const severeImpactSevereCasesByRequestedTime = Math.trunc(
    severeInfectionsByRequestedTime * 0.15
  );
  const availableBedSpace = Math.trunc(data.totalHospitalBeds * 0.35);
  const hospitalBedsByRequestedTime = availableBedSpace - impactSevereCasesByRequestedTime;
  const severeHospitalBedsByRequestedTime = availableBedSpace
  - severeImpactSevereCasesByRequestedTime;

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: severeInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeHospitalBedsByRequestedTime
    }
  };
};

export default covid19ImpactEstimator;
