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

const getHospialBedsByRequestedTime = (bedSpaces, casesByRequestedTime) => {
  const availableBedSpace = bedSpaces * 0.35;
  return (Math.trunc(availableBedSpace - casesByRequestedTime));
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
  const impactSevereCasesByRequestedTime = infectionsByRequestedTime * 0.15;
  const severeImpactSevereCasesByRequestedTime = severeInfectionsByRequestedTime * 0.15;
  const hospitalBedsByRequestedTime = getHospialBedsByRequestedTime(
    data.totalHospitalBeds,
    impactSevereCasesByRequestedTime
  );
  const severeHospitalBedsByRequestedTime = getHospialBedsByRequestedTime(
    data.totalHospitalBeds,
    impactSevereCasesByRequestedTime
  );
  const casesForICUByRequestedTime = infectionsByRequestedTime * 0.05;
  const severeCasesForICUByRequestedTime = severeInfectionsByRequestedTime * 0.05;
  const casesForVentilatorsByRequestedTime = infectionsByRequestedTime * 0.02;
  const severeCasesForVentilatorsByRequestedTime = severeInfectionsByRequestedTime * 0.02;
  const dollarsInFlight = Math.trunc((infectionsByRequestedTime
    * data.region.avgDailyIncomePopulation) * data.region.avgDailyIncomeInUSD * noOfDays);
  const severeDollarsInFlight = Math.trunc((severeInfectionsByRequestedTime
    * data.region.avgDailyIncomePopulation) * data.region.avgDailyIncomeInUSD * noOfDays);

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeCurrentlyInfected,
      infectionsByRequestedTime: severeInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: severeCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeCasesForVentilatorsByRequestedTime,
      dollarsInFlight: severeDollarsInFlight
    }
  };
};

export default covid19ImpactEstimator;
