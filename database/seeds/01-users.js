
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'test1' , password: '$2a$05$6HgHYqAJJ2gLikxQDvyL8ecaNp5Qbma8wZvm4lxuYjMOUpsuiuWOq'},
        {username: 'test2' , password: '$2a$05$6HgHYqAJJ2gLikxQDvyL8ecaNp5Qbma8wZvm4lxuYjMOUpsuiuWOq'},
        {username: 'test3' , password: '$2a$05$6HgHYqAJJ2gLikxQDvyL8ecaNp5Qbma8wZvm4lxuYjMOUpsuiuWOq'}
      ]);
    });
};
