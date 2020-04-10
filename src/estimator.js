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
  let currentlyInfected = data.reportedCases * 10;
  let severeCurrentlyInfected = data.reportedCases * 50;
  let infectionsByRequestedTime = currentlyInfected * getInfectionsByRequestedTime(
    data.periodType,
    data.timeToElapse
  );
  let severeInfectionsByRequestedTime = severeCurrentlyInfected * getInfectionsByRequestedTime(
    data.periodType,
    data.timeToElapse
  );
  let impactSevereCasesByRequestedTime = infectionsByRequestedTime * 0.15;
  let severeImpactSevereCasesByRequestedTime = severeInfectionsByRequestedTime * 0.15;
  let availableBedSpace = data.totalHospitalBeds * 0.35;
  let hospitalBedsByRequestedTime = availableBedSpace - impactSevereCasesByRequestedTime;
  let severeHospitalBedsByRequestedTime =
    availableBedSpace - severeHospitalBedsByRequestedTime;

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: hospitalBedsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeHospitalBedsByRequestedTime
    }
  };
};

export default covid19ImpactEstimator;
