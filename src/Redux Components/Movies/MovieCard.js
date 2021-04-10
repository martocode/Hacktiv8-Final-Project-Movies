import React, { useContext } from "react";
import { Card, Col } from "antd";
import { MoviesContext } from "../MyContext/MyContext";
const { Meta } = Card;

/**
 *
 * @param {String} Title
 * @param {String} Poster
 */
export const imageSrc = (Title, Poster) => (
	<img className="poster image" alt={Title} src={Poster} />
);
/**
 * @returns {JSX.Element[]}
 */
export const MovieCard = () => {
	const { states } = useContext(MoviesContext),
		{
			movies: { filter },
		} = states;
	/**
	 *
	 * @param {String} Title
	 * @param {String} Year
	 */
	const GetChild = (Title, Year) => (
		<>
			<div className="title">{Title}</div>
			<p className="year">{Year}</p>
		</>
	);

	return filter.map(
		/**
		 * @param {Object} Data
		 * @param {String} Data.Title
		 * @param {String} Data.Poster
		 * @param {String} Data.Year
		 * @param {Number} k
		 */
		({ Title, Poster, Year }, k) => (
			<Col key={k} className="card movie">
				<Card hoverable cover={imageSrc(Title, Poster)}>
					<Meta title={GetChild(Title, Year)} />
				</Card>
			</Col>
		)
	);
};
