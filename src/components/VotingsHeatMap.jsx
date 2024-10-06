import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getSeasonsDetails } from "../api/tv";

export default function VotingsHeatMapView(props) {
    const [loading, setLoading] = useState(true);
    const [seasonsDetails, setSeasonsDetails] = useState([]);

    useEffect(() => {
        fetchSeasonsDetails();
    }, []);

    const fetchSeasonsDetails = async () => {
        for (let i = 1; i <= props.numberOfSeasons; i++) {
            const response = await getSeasonsDetails(props.tvId, i);
            setSeasonsDetails((prev) => [...prev, response.data]);
        }

        setLoading(false);
    };

    const getBackgroundColor = (rating) => {
        let r, g, b;

        if (rating < 5) {
            r = 139 + (250 - 139) * (rating / 5);
            g = 0 + (210 - 0) * (rating / 5);
            b = 0;
        } else {
            r = 250 + (0 - 250) * ((rating - 5) / 5);
            g = 210 + (100 - 210) * ((rating - 5) / 5);
            b = 0;
        }

        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        return `rgb(${r}, ${g}, ${b})`;
    };

    if (loading) {
        return props.display && <div>Loading...</div>;
    } else
        return (
            props.display && (
                <div className="z-40 fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center">
                    <div className="w-full h-full flex flex-row items-center justify-center p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <table>
                                <tbody>
                                    {seasonsDetails?.map((season) => (
                                        <tr key={season.id}>
                                            <td className="border p-2">S{season.season_number}</td>
                                            {season.episodes.map((episode) => (
                                                <td
                                                    key={episode.id}
                                                    className="p-2"
                                                    style={
                                                        episode.vote_average
                                                            ? {
                                                                  backgroundColor:
                                                                      getBackgroundColor(
                                                                          episode.vote_average
                                                                      ),
                                                              }
                                                            : {}
                                                    }
                                                >
                                                    {episode.vote_average}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        );
}
