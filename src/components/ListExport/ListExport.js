import React from "react";

import { connect } from "react-redux";

const ListExport = props => {
  return (
    <a href={url(props.type, props.data)} download={props.download}>
      {props.title}
    </a>
  );
};

function mapDispatchToProps(dispatch) {
  return {};
}
function url(type, data) {
  let blob = {};
  if (type === "csv") {
    const csvRows = [];
    const agents = Object.keys(data.agents);
    const goals = Object.keys(data.goals);
    const edges = Object.keys(data.edges);
    const goalMembers = Object.keys(data.goalMembers);
    const loop = (heardes, data) => {
      const csvRows = [];

      csvRows.push(Object.keys(data[heardes[0]]).join(","));
      for (const index in heardes) {
        csvRows.push(Object.values(data[heardes[index]]));
      }
      return csvRows.join("\n");
    };
    if (agents.length > 0) csvRows.push(loop(agents, data.agents));
    if (goals.length > 0) csvRows.push("\n" + loop(goals, data.goals));
    if (edges.length > 0) csvRows.push("\n" + loop(edges, data.edges));
    if (goalMembers.length > 0)
      csvRows.push("\n" + loop(goalMembers, data.goalMembers));

    blob = new Blob([csvRows.join("\n")], {
      type: "text/csv"
    });
  } else {
    blob = new Blob([JSON.stringify(data, null, 2)], { type: "" });
  }
  const url = window.URL.createObjectURL(blob);
  return url;
}
function mapStateToProps(state) {
  return {
    data: {
      agents: state.agents,
      goals: state.goals,
      edges: state.edges,
      goalMembers: state.goalMembers
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExport);
