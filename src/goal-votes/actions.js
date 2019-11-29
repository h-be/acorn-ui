/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createHolochainZomeCallAsyncAction } from "@holochain/hc-redux-middleware";

import { DEVELOPMENT_INSTANCE_NAME, ZOME_NAME } from "../holochainConfig";

/* action creator functions */

const addVoteOfGoal = createHolochainZomeCallAsyncAction(
  DEVELOPMENT_INSTANCE_NAME,
  ZOME_NAME,
  "add_vote_of_goal"
);
const archiveVoteOfGoal = createHolochainZomeCallAsyncAction(
  DEVELOPMENT_INSTANCE_NAME,
  ZOME_NAME,
  "archive_vote_of_goal"
);
const fetchGoalVotes = createHolochainZomeCallAsyncAction(
  DEVELOPMENT_INSTANCE_NAME,
  ZOME_NAME,
  "fetch_goal_votes"
);

export { addVoteOfGoal, fetchGoalVotes, archiveVoteOfGoal };
