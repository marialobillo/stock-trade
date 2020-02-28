import React from 'react';

export default function Dashboard({ user }) {

    return (
        <div className="container">
            <div className="card">
                <span>Welcome {user.name}to your DashBoard!!!</span>
            </div>

            <div className="table">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Holding</th>
                            <th>Date</th>
                            <th>Shares</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    );
}