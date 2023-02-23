const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

// Nested critic object
const reduceCritics = mapProperties({
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
});

function read(reviewId) {
  return knex('reviews as r')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select('r.*', 'c.*')
    .where({ review_id: reviewId })
    .first()
    .then(reduceCritics);
}

function update(updatedReview) {
  return knex('reviews')
    .select('*')
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, '*')
    .then((updatedRecords) => updatedRecords[0]);
}

function destroy(reviewId) {
  return knex('reviews').where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
};
