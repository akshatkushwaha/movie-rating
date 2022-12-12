import React, { Component } from "react";

export default class PageNavigation extends Component {
  render() {
    return (
      <>
        <div className="flex flex-row justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
            onClick={this.props.previousPage}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            onClick={this.props.nextPage}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}
