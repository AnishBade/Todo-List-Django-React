from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path("dashboard/", views.dashboard),
    # Todo URLs
    path("todo/<user_id>/", views.TodoListView.as_view()),
    path("todo-detail/<user_id>/<todo_id>/", views.TodoDetailView.as_view()),
]
