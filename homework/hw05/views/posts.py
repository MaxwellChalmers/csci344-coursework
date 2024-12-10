import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post 
from models.bookmark import Bookmark
from views import get_authorized_user_ids, can_view_post


def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):

        # giving you the beginnings of this code (as this one is a little tricky for beginners):

        try:
            postcount=int(request.args.get("limit", 20))
            if postcount > 50 or postcount <= 0:
                return Response(
                json.dumps({"message": f"invalid number of posts requested.(must be under 50)"}),
                mimetype="application/json",
                status=400,
                )       
        except:
            return Response(
                json.dumps({"message": f"limit must be a number"}),
                    mimetype="application/json",
                    status=400,
            )   
    
        ids = get_authorized_user_ids(self.current_user)
        posts = Post.query.filter(Post.user_id.in_(ids)).limit(postcount)

        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):

        data = request.json

        url = data.get("image_url")
        caption = data.get("caption")
        alt_text = data.get("alt_text")
       

        if not url:
            return Response(
            json.dumps({"message": f"Image URL is needed."}),
            mimetype="application/json",
            status=400,
        )

        
        new_post = Post(
            image_url=url,
            user_id=self.current_user.id,
            caption=caption,
            alt_text=alt_text, )
        db.session.add(new_post)
        db.session.commit()

        
        return Response(json.dumps(new_post.to_dict(user=self.current_user)), mimetype="application/json", status=201)


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def patch(self, id):
        print("POST id=", id)

        post = Post.query.get(id)
        if not post:
            return Response(
            json.dumps({"message": f"post {id} not found."}),
            mimetype="application/json",
            status=404,
            )
        if not (post.user.id == self.current_user.id):
            return Response(
            json.dumps({"message": "you are not the owner of this post, so no editing"}),
            mimetype="application/json",
            status=404,
            )
        
        data = request.json

        url = data.get("image_url")
        caption = data.get("caption")
        alt_text = data.get("alt_text")

        if url: post.image_url = url
        if caption: post.caption = caption
        if alt_text: post.alt_text = alt_text

        db.session.commit()

        return Response(json.dumps(post.to_dict()), mimetype="application/json", status=200)

    def delete(self, id):
        print("POST id=", id)
        
        post = Post.query.get(id)
        if not post:
            return Response(
            json.dumps({"message": f"post {id} not found."}),
            mimetype="application/json",
            status=404,
            )
        if not (post.user.id == self.current_user.id):
            return Response(
            json.dumps({"message": "you are not the owner of this post, so no deleting"}),
            mimetype="application/json",
            status=404,
            )
        
        Bookmark.query.filter_by(post_id=id).delete()
        db.session.delete(post)
        db.session.commit()

        return Response(json.dumps({"message": f"post {id} has been deleted."}), mimetype="application/json", status=200)

    def get(self, id):
        print("POST id=", id)
        # TODO: Add GET logic...
        
        if not can_view_post(id, self.current_user):  
            return Response(
            json.dumps({"message": f"post {id} not found."}),
            mimetype="application/json",
            status=404,
            )
        post = Post.query.get(id).to_dict(user=self.current_user)
        

        return Response(
            json.dumps(post),
            mimetype="application/json",
            status=200,
        )

      


def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
