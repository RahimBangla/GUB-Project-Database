# nodejs-mysql-crud

## npm i && npm run dev

https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application

<%= tagline %>

    <ul>
      <% mascots.forEach(function(mascot) { %>
        <li>
          <strong><%= mascot.name %></strong>
          representing <%= mascot.organization %>,
          born <%= mascot.birth_year %>
        </li>
      <% }); %>
    </ul>

...

<header>
  <%- include('../partials/header', {variant: 'compact'}); %>
</header>
...

...
<em>Variant: <%= typeof variant != 'undefined' ? variant : 'default' %></em>
...
