import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/router";
import Image from "next/image";

function MainHeader(props) {
  const router = useRouter();
  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm rounded">
      <div className="container-fluid">
        <Link className={`navbar-brand`} href={`/`}>
          <Image
            src="https://i.postimg.cc/mzt5KMt6/sapevi-logo.png"
            border="0"
            alt="sapevi-logo"
            width="100"
            height="45"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {props.currentUser ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={
                    router.asPath === "/profile"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  aria-current="page"
                  href={`/`}
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    router.asPath === "/profile/setting"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href={`/profile/setting`}
                >
                  Setting
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    router.asPath === "/quiz-list"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href={`/quiz-list`}
                >
                  Quiz Lists
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href={`/`}
                >
                  Home
                </Link>
              </li>
            </ul>
          )}
          <div>
            {props.currentUser ? (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            ) : (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default MainHeader;
