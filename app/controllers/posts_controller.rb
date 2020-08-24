class PostsController < ApplicationController
  before_action :basic_auth

  def index
    @posts = Post.all.order(id: "DESC")
  end

  # def new
  # end

  def create
    post = Post.create(content: params[:content], checked: false)
    render json: {post: post}
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

  private

  def basic_auth                            # BASIC認証のメソッド
    authenticate_or_request_with_http_basic do |username, password|
      # binding.pry
      username == ENV["BASIC_AUTH_USER"] && password == ENV["BASIC_AUTH_PASSWORD"]    # 環境変数を代入
      # username == "admin" && password == "2222"
    end
  end
end
