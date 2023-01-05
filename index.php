<?php
    include './conf/conn.php';
    $sql = "SELECT id_daftar, Nama, NIK ,Alamat, Jenis_Bayar, Poli_tujuan, KartuAsuransi, KartuRSPI, KTP,  date(insert_at) as tanggal, time(insert_at) as waktu ,insert_at, date(curdate()+1) as tanggal_layanan, no_wa FROM `daftar_pasien` having tanggal = (SELECT curdate()) or tanggal = (SELECT curdate()+1) ORDER BY insert_at asc;";
    // $sql = "SELECT * FROM daftar_pasien";
    $_SESSION['data_pendaftar'] = sqlFetch(dbcon()->query($sql));
    $dp =  $_SESSION['data_pendaftar'];
?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>PI-Care Dashboard</title>

    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

    <!-- Custom styles for this page -->
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon">
                    <i class="fas fa-hospital"></i>
                </div>
                <div class="sidebar-brand-text mx-3">PI-Care</div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item active">
                <a class="nav-link" href="index.html">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Topbar Search -->
                    <form
                        class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                        <li class="nav-item dropdown no-arrow d-sm-none">
                            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-search fa-fw"></i>
                            </a>
                            <!-- Dropdown - Messages -->
                            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form class="form-inline mr-auto w-100 navbar-search">
                                    <div class="input-group">
                                        <input type="text" class="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2">
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="button">
                                                <i class="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <h1 class="h3 mb-2 text-gray-800">Tabel Data Pendaftar</h1>
                    <!-- <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                        For more information about DataTables, please visit the <a target="_blank"
                            href="https://datatables.net">official DataTables documentation</a>.</p> -->

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Data Pendaftaran</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Jenis Bayar</th>
                                            <th>Poli Tujuan</th>
                                            <th>Jam Daftar</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                        $i=1;
                                        foreach ($dp as $data) {
                                        ?>
                                            <tr>
                                                <td><?=$i++?></td>
                                                <td><?=$data['Nama']?></td>
                                                <td><?=$data['Jenis_Bayar']?></td>
                                                <td><?=$data['Poli_tujuan']?></td>
                                                <td><?=$data['waktu']?></td>
                                                <td>
                                                    <div class="dropdown mb-4">
                                                        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Aksi
                                                        </button>
                                                        <div class="dropdown-menu animated--fade-in" aria-labelledby="dropdownMenuButton" style="">
                                                            <button class="dropdown-item text-info detail" data-id="<?=$data['id_daftar']?>" data-toggle="modal" data-target="#modalDetail">Detail</button>
                                                            <button class="dropdown-item text-primary lampiran" data-id="<?=$data['id_daftar']?>" data-toggle="modal" data-target="#modalLampiran">Lampiran</button>
                                                            <button class="dropdown-item text-success setVerifikasi" data-poli="<?=$data['Poli_tujuan']?>" data-jenis="<?=$data['Jenis_Bayar']?>" data-id="<?=$data['id_daftar']?>" data-nama="<?=$data['Nama']?>" data-tanggal="<?=$data['tanggal_layanan']?>"  data-no="<?=$data['no_wa']?>"  data-toggle="modal" data-target="#modalVerifikasi">Verifikasi Pendaftaran</button>
                                                            <button class="dropdown-item text-warning setTolak" data-poli="<?=$data['Poli_tujuan']?>" data-jenis="<?=$data['Jenis_Bayar']?>" data-id="<?=$data['id_daftar']?>" data-nama="<?=$data['Nama']?>" data-tanggal="<?=$data['tanggal_layanan']?>"  data-no="<?=$data['no_wa']?>" data-toggle="modal" data-target="#modalBatal">Tolak Pendaftaran</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        <?php
                                            }
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Unit IT RS Pelita Insani 2023</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->

        <!-- Modal Detail-->
        <div class="modal fade bd-example-modal-lg" id="modalDetail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal Detail</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <form>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Nama</label>
                                <input type="email" class="form-control" disabled id="nama_pasien">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">NIK</label>
                                <input type="email" class="form-control" disabled id="NIK_pasien">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Jenis Bayar</label>
                                <input type="email" class="form-control" disabled id="Jenis_bayar_pasien">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Poli Tujuan</label>
                                <input type="email" class="form-control" disabled id="Poli_tujuan_pasien">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Alamat</label>
                        <textarea class="form-control" id="alamat_pasien" disabled rows="3"></textarea>
                    </div>
                </form>
                <!-- <table class="table table-responsive table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Nama</th>
                                <th scope="col">NIK</th>
                                <th scope="col">Jenis Bayar</th>
                                <th scope="col">Poli Tujuan</th>
                                <th scope="col">Alamat</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                        </table> -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        
        <!-- Modal Lampiran-->
        <div class="modal fade bd-example-modal-lg" id="modalLampiran" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header ">
                    <h5 class="modal-title" id="exampleModalLabel">Dokumen Lampiran</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                                            
                <!-- carousel -->
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner" id="carousel-lampiran">
                        </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="fas fa-chevron-circle-left" style="color:black" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="fas fa-chevron-circle-right" style="color:black" aria-hidden="true"><i class=""></i></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

        <!-- modalVerifikasi -->
        <div class="modal fade bd-example-modal-lg" id="modalVerifikasi" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header ">
                    <h5 class="modal-title" id="exampleModalLabel">Form Verifikasi Daftar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                
                    <div class="row">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Nama Pasien</label>
                                <input type="text" disabled class="form-control" id="Nama_pendaftar">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Poli Tujuan</label>
                                <input type="text" disabled class="form-control" id="poli_tujuan">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">No. RM</label>
                                <input type="number" class="form-control" id="no_rm">
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Tanggal Layanan</label>
                                <input type="date" disabled class="form-control" id="tanggal_layanan">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Jenis Bayar</label>
                                <input type="text" disabled class="form-control" id="data-jenis">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">No Antrian</label>
                                <input type="number" class="form-control" id="no_antrian">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Jam Layanan</label>
                                <input type="time" class="form-control" id="jam_layanan">
                            </div>
                        </div>
                    </div>

                    <!-- <div class="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div> -->

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btn_verifikasi">Verifikasi</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>

        <div class="modal fade bd-example-modal-lg" id="modalBatal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header ">
                    <h5 class="modal-title" id="exampleModalLabel">Form Tolak Pendaftaran</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Pesan Tambahan</label>
                        <textarea class="form-control" id="pesan_batal" rows="3" placeholder="Kosongkan Jika Tidak Digunakan"></textarea>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btn_batal">Batal</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>


        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>
    <!-- Bootstrap core JavaScript-->

    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="js/demo/datatables-demo.js"></script>
    <script>
    
    function clear(params) {
        let next = $(params+' .modal-body').find('.form-group').find('.form-control')
        Object.keys(next).forEach(key => {
            //console.log(key)
            if(key!='length' &&key!='prevObject'){
                $('#'+next[key].id).val(null)
            }
        });
        $(params).modal('toggle')
    }

        $(".detail").click(function () {
            $.post('conf/api-serv.php',{getDataRow:$(this).attr('data-id')}, function(data){
                    dt = JSON.parse(data)[0]
                    $("#nama_pasien").val(dt.Nama)
                    $("#NIK_pasien").val(dt.NIK)
                    $("#Jenis_bayar_pasien").val(dt.Jenis_Bayar)
                    $("#Poli_tujuan_pasien").val(dt.Poli_tujuan)
                    $("#alamat_pasien").val(dt.Alamat)
                });
            })
        $(".lampiran").click(function () {
            $.post('conf/api-serv.php',{getLampiran:$(this).attr('data-id')}, function(data){
                    dt = JSON.parse(data)
                    let active;
                    $("#carousel-lampiran").html("")
                    Object.keys(dt).forEach(key => {
                        if(key=="KTP"){
                            active="active";
                        }else{
                            active="";
                        }
                        if(dt[key]!=null){
                            $("#carousel-lampiran").append(""+
                            "<div class='carousel-item "+active+"'>"+
                            "<img class='w-100' style='height:500px' src='./upload/"+dt[key]+"' alt='First "+key+"'>"+
                                "</div>")
                        }
                    });
                });
            })
        
        $(".setVerifikasi").click(function () {
            $('#Nama_pendaftar').val($(this).attr('data-nama'))
            $('#tanggal_layanan').val($(this).attr('data-tanggal'))
            $('#poli_tujuan').val($(this).attr('data-poli'))
            $('#data-jenis').val($(this).attr('data-jenis'))
            $('#btn_verifikasi').attr('data-id',$(this).attr('data-id'))
            $('#btn_verifikasi').attr('data-no',$(this).attr('data-no'))
        })

        $("#no_rm").keypress(function(event) {
            let keycode = event.keyCode || event.which;
            if($(this).val()!=""){
                if(keycode == '13') {
                    console.log($(this).val())
                    // request ke server buat nyari data antrian poli jam tunggu, tanggal layanan pasien dari db epasien
                //     alert('You pressed a "enter" key in somewhere');    
                }
            }
        });

        $('#btn_verifikasi').click(function (params) {
            let no_wa = $(this).attr('data-no')
            let pesan =
            "Assalamualaikum Wr. Wb. \n"+
            "Yth. Tn/Ny."+$('#Nama_pendaftar').val()+"\n"+
            "Nomor Rekam Medis : "+$('#no_rm').val()+"\n"+
            "Pendaftaran di tanggal "+$('#tanggal_layanan').val()+" berhasil dilakukan\n"+
            "Nomor Antrian Anda :"+$('#no_antrian').val()+"\n"+
            "Silahkan datang pada Jam : "+$('#jam_layanan').val()+"\n"+
            "di Poli : "+$('#poli_tujuan').val()+"\n"+
            "di Mohon untuk datang 5 menit lebih awal dan langsung menuju Ruangan";
                
            $.post('conf/api-serv.php',{setVerifikasi:$(this).attr('data-id')}, function(data){
                data = JSON.parse(data)
                if(data==200){
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8081/sendToClient/",
                        data: {
                            no:no_wa,
                            message:pesan
                        },
                        dataType: "JSON",
                        success: function name(data) {
                            // // fungsi clear
                            clear('#modalVerifikasi')
                        }
                    });
                }
            });
        })
        
        $(".setBatal").click(function () {
            $('#btn_batal').attr('data-poli',$(this).attr('data-poli'))
            $('#btn_batal').attr('data-nama',$(this).attr('data-nama'))
            $('#btn_batal').attr('data-tanggal',$(this).attr('data-tanggal'))
            $('#btn_batal').attr('data-id',$(this).attr('data-id'))
            $('#btn_batal').attr('data-no',$(this).attr('data-no'))
        })

        $('#btn_batal').click(function (params) {
            let no_wa = $(this).attr('data-id')
            let pesan =
            "Assalamualaikum Wr. Wb. \n"+
            "Yth. Tn/Ny. \n"+
            "Mohon Maaf Pendaftaran anda di tanggal "+$('#tanggal_layanan').val()+" Pada Poli :"+$('#poli_tujuan').val()+" di Tolak\n"+
            "Dikarenakan data yang anda kirim salah, tidak lengkap, lampiran tidak sesuai, lampiran kurang lengkap, atau layanan Poli Tutup/Kuota penuh\n"+
            "Dimohon untuk mengikuti arahan Admin Selanjutnya\n"+
            "Pesan tambahan :\n"+
            $('#pesan_batal').val();

            $.post('conf/api-serv.php',{setBatal:$(this).attr('data-id')}, function(data){
                let id = $(this).attr('data-id')
                data = JSON.parse(data)
                if(data==200){
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8081/sendToClient/",
                        data: {
                            hapus_id:id,
                            no:no_wa,
                            message:pesan
                        },
                        dataType: "JSON",
                        success: function name(data) {
                            clear('#modalBatal')
                            // // console.log("data dikirim ke client")
                        }
                    });
                }
            });
        })

    </script>
</body>

</html>