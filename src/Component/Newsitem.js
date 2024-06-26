import React, { Component } from 'react';

export class Newsitem extends Component {
    
  render() {
    const cardStyle = {
      width: "18rem"
    };
let{title,discription,imageUrl,newsurl}=this.props;
    return (
      <div className='my-3'>
        <div className="card" style={cardStyle}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{ title}</h5>
            <p className="card-text">{discription}</p>
            <a href={newsurl} target='_blank' className="btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
