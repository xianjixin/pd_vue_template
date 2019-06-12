FROM xianjixin/base_build_x_pd as glup
#ADD http://buildapi.xiongmaozhanggui.com /version.txt
WORKDIR /idc_f-view
#将项目里面的所有项目的package.json都备份一份
RUN  mv ./dev/client/package.json ./dev/client/package-bak.json 

COPY ./dev ./dev
#执行脚本文件
RUN node match_package.js

WORKDIR /idc_f-view/dev/client/
RUN ls &&   npm run build-pro
RUN ls ./

FROM nginx:stable-alpine as build
ENV LC_ALL en_US.UTF-8
ENV TZ=Asia/Shanghai
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories ; \  
  apk update ; \     
  apk add --no-cache  --update bash  tzdata   ; \     
  echo "Asia/Shanghai" > /etc/timezone ; \     
  cp -r -f /usr/share/zoneinfo/Asia/Shanghai /etc/localtime ; \ 
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone   ; \  
  rm -rf /var/cache/apk/*  /tmp/*   /var/tmp/*  ; \
  mkdir -p /etc/nginx/ctmpl; \
  echo "hosts: files dns" > /etc/nsswitch.conf


COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf


COPY ./static_business/cdn /cdn

#client
COPY --from=glup /idc_f-view/dev/client/dist/client_privileges/html /public/client_privileges/html/
COPY --from=glup /idc_f-view/dev/client/dist /cdn/client_privileges/

LABEL SERVICE_NAME="static_business"

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]