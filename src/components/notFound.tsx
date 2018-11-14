import * as React from "react";
import { inject, observer } from "mobx-react";
import departmentStore from "../stores/department.store";

export interface NotFoundProps {
  departmentStore: typeof departmentStore;
}

class NotFound extends React.Component<NotFoundProps, any> {
  public render() {
    return <div>Not found</div>;
  }
}
export default inject("departmentStore")(observer(NotFound));
