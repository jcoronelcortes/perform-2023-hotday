import { useMemo } from "react";
import MgmtZoneView from "./view/MgmtZoneView";
import TagView from "./view/TagView";
import SyntheticView from "./view/SyntheticView";
import HomeView from "./view/HomeView";

export default function Results({ props }) {
  const renderPage = () => {
    if (props.selected.value === "mzs") {
      return <MgmtZoneView props={props} />;
    }
    if (props.selected.value === "tags") {
      return <TagView props={props} />;
    }
    if (props.selected.value === "synths") {
      return <SyntheticView props={props} />;
    }
    if (props.selected.value === "home") {
      return <HomeView props={props} />;
    }
  };
  return renderPage();
}
