/// <reference types="@fastly/js-compute" />

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  return new Response('hi', { status: 200 });
}
