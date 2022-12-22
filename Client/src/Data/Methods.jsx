import axios from "axios";
import { serverLink } from "./Variables";

export const ObjectGroupBy = (object, group) => {
  var ans = {};
  object.forEach(function (item) {
    var list = ans[item[group]];
    list ? list.push(item) : (ans[item[group]] = [item]);
  });
  return ans;
};

export const ObjectKeyReplace = (object, data, oldColumn, newColum) => {
  Object.keys(object).forEach((key) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i][oldColumn] === key) {
        var newKey = data[i][newColum];
        object[newKey] = object[key];
        delete object[key];
        break;
      }
    }
  });
  return object;
};

export const TwoArraySort = (mainArray, secondaryArray) => {
  for (let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < mainArray.length - i - 1; j++) {
      if (mainArray[j] < mainArray[j + 1]) {
        [mainArray[j], mainArray[j + 1]] = [mainArray[j + 1], mainArray[j]];
        [secondaryArray[j], secondaryArray[j + 1]] = [
          secondaryArray[j + 1],
          secondaryArray[j],
        ];
      }
    }
  }
  return [mainArray, secondaryArray];
};

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const stringToAv = (fname, lname) => {
  let n = fname[0] + lname[0];
  return n;
};

export const getResult = async (transactions) => {
  let link = serverLink + "/candidates";
  let res = await axios.get(link);
  const candidates = res.data;

  link = serverLink + "/elections";
  res = await axios.get(link);
  const electionsD = res.data;

  var electionGroup = ObjectGroupBy(transactions, "election_id");
  var newElectionGroup = [];
  Object.keys(electionGroup).forEach((ele) => {
    for (let i = 0; i < electionsD.length; i++) {
      if (electionsD[i]["_id"] === ele) {
        newElectionGroup[ele] = electionGroup[ele];
        break;
      }
    }
  });
  electionGroup = ObjectKeyReplace(newElectionGroup, electionsD, "_id", "name");

  const elections = Object.keys(electionGroup);

  var ans = [];

  for (let i = 0; i < elections.length; i++) {
    var electionRes = ObjectGroupBy(
      electionGroup[elections[i]],
      "candidate_id"
    );

    electionRes = ObjectKeyReplace(electionRes, candidates, "_id", "username");

    let votes = [];
    let candidate = Object.keys(electionRes);
    // eslint-disable-next-line
    candidate.filter((tmp) => votes.push(electionRes[tmp].length));
    [votes, candidate] = TwoArraySort(votes, candidate);
    ans.push({ name: elections[i], candidates: candidate, vote: votes });
  }
  return ans;
};
