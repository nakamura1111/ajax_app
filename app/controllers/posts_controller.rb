class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")
  end

  # def new
  # end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    if post.checked                         # post.checked : 既読したか否かを判定するプロパティ
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    
    item = Post.find(params[:id])
    render json: {post: item}               # json 形式で出力
  end
end