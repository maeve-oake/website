FROM nginx:alpine
RUN echo 'server { listen 80; root /usr/share/nginx/html; include /etc/nginx/static-include.conf; }' > /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/static-include.conf
COPY src /usr/share/nginx/html